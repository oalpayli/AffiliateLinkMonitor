# 🎯 The Sniper Bot - Master Plan

## Proje: affiliatelinkmonitoring.com Otonom Marketing Sistemi
**Tarih:** 2026-03-03
**Dil:** Python 3.11+
**Hedef:** Tek komutla Lead Keşfi → Tarama → Rapor → Email pipeline'ı

---

## Mimari Genel Bakış

```
┌─────────────────────────────────────────────────────────────┐
│                    main.py (Orchestrator)                     │
├─────────────┬──────────────┬──────────────┬─────────────────┤
│  searcher/  │  scraper/    │  analyzer/   │  messenger/     │
│             │              │              │                 │
│ Google Dork │ Linktree     │ Link Health  │ SendGrid API    │
│ Bing Search │ Beacons      │ Stock Check  │ Email Templates │
│ URL Harvest │ Stan.store   │ Lead Scoring │ DM Drafts       │
│             │ Bio Extract  │ Reports      │ Follow-up Queue │
└─────────────┴──────────────┴──────────────┴─────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   data/           │
                    │   leads.json      │
                    │   reports/        │
                    │   email_log.json  │
                    └───────────────────┘
```

---

## Klasör Yapısı

```
marketing/
├── sniper_bot/
│   ├── __init__.py
│   ├── main.py                 # Orchestrator - tek giriş noktası
│   ├── config.py               # API keys, ayarlar
│   ├── models.py               # Lead, ScanResult dataclasses
│   │
│   ├── searcher/
│   │   ├── __init__.py
│   │   ├── google_dorker.py    # Google arama otomasyonu
│   │   ├── bing_searcher.py    # Bing API (rate-limit yok)
│   │   ├── url_harvester.py    # Sonuçlardan URL çıkarma
│   │   └── dork_queries.py     # Önceden hazır dork sorguları
│   │
│   ├── scraper/
│   │   ├── __init__.py
│   │   ├── profile_scraper.py  # Linktree/Beacons/Stan profil scraping
│   │   ├── link_extractor.py   # Affiliate link çıkarma
│   │   └── social_finder.py    # Email/Instagram/TikTok bulma
│   │
│   ├── analyzer/
│   │   ├── __init__.py
│   │   ├── link_checker.py     # HTTP status check (kırık link tespiti)
│   │   ├── stock_checker.py    # Amazon stok durumu
│   │   ├── lead_scorer.py      # Lead puanlama algoritması
│   │   └── report_generator.py # MD rapor oluşturma
│   │
│   ├── messenger/
│   │   ├── __init__.py
│   │   ├── email_sender.py     # SendGrid entegrasyonu
│   │   ├── template_engine.py  # Dinamik email template'leri
│   │   ├── dm_drafter.py       # Instagram/TikTok DM taslakları
│   │   └── followup_queue.py   # Takip email sırası
│   │
│   └── utils/
│       ├── __init__.py
│       ├── database.py         # leads.json CRUD
│       ├── proxy_manager.py    # Proxy rotasyonu (opsiyonel)
│       ├── rate_limiter.py     # İstek hız limitleme
│       └── logger.py           # Renkli terminal çıktısı
│
├── data/                       # (mevcut, korunacak)
│   ├── leads.json
│   ├── reports/
│   ├── urls.txt
│   └── email_log.json          # (yeni)
│
├── templates/                  # (mevcut, korunacak)
│   └── outreach-emails.md
│
├── scripts/                    # (mevcut TS, arşiv olarak kalacak)
│   ├── lead-finder.ts
│   └── batch-scan.ts
│
├── requirements.txt
├── .env.example
└── SNIPER_BOT_PLAN.md          # (bu dosya)
```

---

## Sprint #1: Otonom Lead Keşfi (searcher/)

### Amaç
Google/Bing üzerinden otomatik olarak affiliate marketer Linktree/Beacons profillerini bulmak.

### Dork Sorguları (dork_queries.py)

```python
DORK_QUERIES = [
    # === Linktree - Amazon Affiliate ===
    'site:linktr.ee "amazon" "shop"',
    'site:linktr.ee "my amazon storefront"',
    'site:linktr.ee "amazon finds"',
    'site:linktr.ee "amazon favorites"',
    'site:linktr.ee "shop my amazon"',
    'site:linktr.ee "affiliate" "amazon"',
    'site:linktr.ee "amazon associates"',
    'site:linktr.ee "amazon influencer"',

    # === Linktree - Genel Affiliate ===
    'site:linktr.ee "shop my favorites"',
    'site:linktr.ee "use my code"',
    'site:linktr.ee "discount code"',
    'site:linktr.ee "affiliate links"',
    'site:linktr.ee "commission"',
    'site:linktr.ee "LTK" OR "liketoknow"',
    'site:linktr.ee "shopmy" OR "shop my"',

    # === Beacons ===
    'site:beacons.ai "amazon"',
    'site:beacons.ai "shop my"',
    'site:beacons.ai "affiliate"',

    # === Stan.store ===
    'site:stan.store "amazon"',
    'site:stan.store "affiliate"',

    # === Niş bazlı ===
    'site:linktr.ee "home decor" "amazon"',
    'site:linktr.ee "fashion finds" "amazon"',
    'site:linktr.ee "tech" "amazon finds"',
    'site:linktr.ee "kitchen" "amazon must haves"',
    'site:linktr.ee "beauty" "amazon favorites"',
    'site:linktr.ee "fitness" "amazon"',
    'site:linktr.ee "baby" OR "mom" "amazon"',

    # === Türkçe ===
    'site:linktr.ee "amazon" "ürün"',
    'site:linktr.ee "amazon" "favorilerim"',
]
```

### Teknik Yaklaşım

**Seçenek A: googlesearch-python (Basit, risk: rate limit)**
```python
from googlesearch import search
results = search(query, num_results=50, lang="en")
```

**Seçenek B: Bing Web Search API (Önerilen)**
- Aylık 1000 ücretsiz istek
- Rate limit yok
- Resmi API, ban riski sıfır
- Key: https://portal.azure.com → Cognitive Services

**Seçenek C: SerpAPI / ScraperAPI (Premium)**
- Google sonuçlarını proxy üzerinden çeker
- Aylık 100 ücretsiz (SerpAPI)
- En güvenilir ama paralı

### Öneri: Bing API + googlesearch-python fallback

```
Bing API (birincil) → rate limit yok, güvenilir
    ↓ (başarısız olursa)
googlesearch-python (yedek) → time.sleep(15-30) ile yavaş ama ücretsiz
```

### Çıktı
Her çalışmada:
- `data/discovered_urls.json` → Bulunan tüm URL'ler (deduplicated)
- `data/leads.json` → Yeni profiller otomatik eklenir
- Terminal: Kaç yeni URL bulundu, kaçı zaten var

---

## Sprint #2: Scraper & Analyzer (Python'a taşıma)

### Mevcut TS Mantığı → Python Karşılığı

| TypeScript (mevcut)       | Python (yeni)                |
|---------------------------|------------------------------|
| axios + cheerio           | httpx + beautifulsoup4       |
| lead-finder.ts            | profile_scraper.py           |
| batch-scan.ts             | link_checker.py              |
| checkLinkHealth()         | stock_checker.py             |
| generateOutreachReport()  | report_generator.py          |

### Yeni Eklenecekler
- **Playwright entegrasyonu**: JS-rendered sayfalar için (Beacons, Stan)
- **Lead Scoring algoritması**:
  ```
  score = (broken_links * 10) + (out_of_stock * 5) + (affiliate_count * 2) + (has_email * 20)
  ```
- **Paralel tarama**: asyncio + httpx ile 5x hızlandırma

---

## Sprint #3: SendGrid Email Outreach

### Akış
```
Lead (scored) → Template seçimi → Kişiselleştirme → SendGrid API → Log
```

### Template Seçim Mantığı
```python
if lead.broken_links > 10:
    template = "high_priority"     # "201 kırık link bulduk!"
elif lead.broken_links > 0:
    template = "medium_priority"   # "Birkaç link sorunlu"
elif lead.out_of_stock > 0:
    template = "low_priority"      # "Bir ürün stokta yok"
else:
    template = "no_issues"         # "Linkler güzel, tanıtım"

if lead.language == "tr":
    template += "_tr"
```

### Güvenlik Kuralları
- Günde max 50 email (SendGrid free tier)
- Her email arasında 30-60 sn bekleme
- Bounce/complaint tracking
- Unsubscribe link zorunlu (CAN-SPAM)
- Her gönderim `email_log.json`'a kaydedilir

---

## Sprint #4: Pipeline Orchestrator (main.py)

### Kullanım

```bash
# Tam pipeline (keşif → tarama → email)
python -m sniper_bot.main --full

# Sadece yeni lead keşfi
python -m sniper_bot.main --discover

# Sadece mevcut lead'leri tara
python -m sniper_bot.main --scan --limit 10

# Sadece email gönder (taranmış lead'lere)
python -m sniper_bot.main --outreach --dry-run

# Dashboard (istatistikler)
python -m sniper_bot.main --stats
```

### Pipeline Akışı

```
1. DISCOVER (10 dk)
   └─ 30 dork sorgusu × 20 sonuç = ~600 URL
   └─ Deduplicate → ~200 yeni URL
   └─ Profil scrape → ~150 affiliate marketer

2. SCAN (20 dk)
   └─ 150 lead × ortalama 8 link = 1200 link kontrolü
   └─ Kırık/stokta yok tespiti
   └─ Lead scoring

3. OUTREACH (5 dk)
   └─ Top 50 scored lead
   └─ Template matching + kişiselleştirme
   └─ SendGrid ile gönderim (veya dry-run)
   └─ Log kayıt

4. REPORT
   └─ Terminal dashboard
   └─ Günlük özet
```

---

## Gerekli API Keys / Servisler

| Servis | Amaç | Maliyet | Öncelik |
|--------|-------|---------|---------|
| Bing Web Search API | Lead keşfi | Ücretsiz (1000/ay) | Sprint 1 |
| SendGrid | Email gönderim | Ücretsiz (100/gün) | Sprint 3 |
| SerpAPI (opsiyonel) | Google dorking yedek | Ücretsiz (100/ay) | Sprint 1 |

---

## .env Dosyası

```env
# Bing Search
BING_API_KEY=your_key_here

# SendGrid
SENDGRID_API_KEY=your_key_here
SENDER_EMAIL=info@affiliatelinkmonitoring.com
SENDER_NAME=Affiliate Link Monitor

# SerpAPI (opsiyonel)
SERPAPI_KEY=your_key_here

# Genel
MAX_EMAILS_PER_DAY=50
SCAN_DELAY_SECONDS=1
SEARCH_DELAY_SECONDS=15
```

---

## Mevcut Verinin Korunması

leads.json'daki 12+ taranmış lead ve raporlar korunacak. Python sistemi aynı JSON formatını kullanacak, mevcut verilerle uyumlu olacak.

---

## Başlangıç Sırası

1. ✅ Plan onayı
2. → `requirements.txt` + klasör yapısı oluştur
3. → `models.py` + `database.py` (mevcut leads.json ile uyumlu)
4. → `searcher/` modülü (Sprint #1 - BUGÜN)
5. → Test: `python -m sniper_bot.main --discover`
6. → Sprint #2, #3, #4 sırayla

---

*Bu plan onaylanırsa kodlamaya geçiyoruz. İlk hedef: Sprint #1'i çalışır hale getirmek.*
