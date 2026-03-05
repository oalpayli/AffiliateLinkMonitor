# 🚀 Affiliate Link Monitor — Marketing Skills Playbook

> **Amaç:** `.claude/skills/` dizinine yüklediğin 32 marketing skill'i Affiliate Link Monitor'ü büyütmek için nasıl, ne zaman ve hangi sırada kullanacağını anlatan eylem kılavuzu.
>
> **Nasıl kullanılır:** Claude Code (terminalde `claude`) açıkken bir skill'i çağırmak için sadece "bu sayfanın CRO'sunu analiz et" veya "@page-cro homepage'i analiz et" diyebilirsin.

---

## 📍 Önce Bunu Yap: Product Context Dosyası

Her skill, Claude'a ürün bağlamını tanıtan bir dosya arar:

`.claude/product-marketing-context.md`

Bu dosyayı oluştur (bir kez yazacaksın, her skill otomatik okuyacak):

```
"product-marketing-context.md dosyası oluştur.
Ürün: Affiliate Link Monitor
Hedef kullanıcı: Affiliate marketers, bloggers, Pinterest/Instagram creators
Problem: Affiliate links bozuluyor, out-of-stock oluyor, sessiz komisyon kayıpları
Çözüm: 24/7 otomatik monitoring, 60 saniyede email alert
Rakipler: AMZ Watcher ($19.95/mo), Pageradar ($14/mo), Lasso ($29/mo)
Fiyat: Free (10 monitor, daily), Pro $12/mo (60 monitor, hourly)
URL: affiliatelinkmonitoring.com
Key stat: %15 Amazon affiliate link 6 ayda bozuluyor"
```

---

## 🗺️ Kullanıcı Edinimi Yol Haritası

Sıfır kullanıcıdan büyürken bu sırayı takip et:

```
Hafta 1-2: SEO Temeli    → İçerik üret, arama trafiği çek
Hafta 3-4: CRO           → Az trafiği dönüşüme çevir
Hafta 5-6: Dağıtım       → Reddit, sosyal medya, email
Hafta 7+:  Growth loops  → Referral, programmatic SEO
```

---

## 🔎 SEO & İçerik Skill'leri

> Bu skill'ler sana organik trafik kazandırır. Kimse gelmiyorsa ilk işin bunlar.

---

### `ai-seo` — AI Arama Motoru Optimizasyonu

Google AI Overviews, ChatGPT, Perplexity ve Claude'un seni kaynak göstermesi için.

**Örnek komut:**
```
"ai-seo skill'ini kullanarak affiliatelinkmonitoring.com'un
şu sorgular için AI tarafından kaynak gösterilmesini nasıl sağlarız:
- 'best affiliate link monitoring tool'
- 'amazon affiliate link broken'
- 'linktree affiliate commissions'
Hangi sayfaları önce optimize etmeliyiz?"
```

**Öncelikli aksiyonlar:**
- Blog yazılarında "According to Affiliate Link Monitor's analysis..." atıfları kullan
- FAQPage + Article schema tüm sayfalara uygula
- `llms.txt` güncel tut
- Reddit'te organik cevaplar yaz (üçüncü taraf kaynak = AI citation)

---

### `seo-audit` — Teknik SEO Denetimi

Trafik gelmiyorsa veya indeksleme sorunu varsa.

**Örnek komut:**
```
"seo-audit skill'ini kullanarak affiliatelinkmonitoring.com için
teknik SEO audit yap. Core Web Vitals, internal linking,
title/meta optimizasyonu, sitemap kontrolü yap.
Öncelikli düzeltmeleri listele."
```

---

### `content-strategy` — İçerik Stratejisi

"Bundan sonra ne yazayım?" sorusunun cevabı.

**Örnek komut:**
```
"content-strategy skill'ini kullanarak Affiliate Link Monitor için
3 aylık içerik stratejisi oluştur.
Hedef kitle: Amazon affiliate bloggers, Pinterest creators
Mevcut blog yazılarım: [7 yazı mevcut]
Rakiplerin yazmadığı konuları bul.
Ayda 4 yazı kapasitem var."
```

**Önerilen 5 content pillar:**
1. Amazon Associates (bozuk link, out-of-stock, ASIN değişimi)
2. Platform Monitoring (Pinterest, Linktree, Instagram bio)
3. Affiliate Link CRO (conversion, disclosure, cloaking)
4. Link hygiene (ne sıklıkta kontrol etmeli, araçlar)
5. Revenue protection (komisyon kaybı hesaplama, case studies)

---

### `programmatic-seo` — Büyük Ölçekli SEO Sayfaları

Onlarca benzer sayfayı otomatik oluşturmak için. **Büyük fırsat.**

**Örnek komut:**
```
"programmatic-seo skill'ini kullanarak şu pattern için
sayfa stratejisi oluştur:
- '[platform] affiliate link checker'
- '[platform] broken link detector'
Hedef platformlar: Etsy, ShareASale, CJ, ClickBank, Rakuten
Her sayfa için URL yapısı, content şablonu, schema markup öner."
```

**Somut örnekler:**
- `/etsy-affiliate-link-checker`
- `/shareasale-link-monitor`
- `/cj-affiliate-broken-link-checker`
- `/clickbank-link-monitor`

Her platform = ayrı keyword hedefi = daha fazla organik trafik kapısı.

---

### `schema-markup` — Yapısal Veri

Belirli bir sayfa için schema eklemek istediğinde.

**Örnek komut:**
```
"schema-markup skill'ini kullanarak
/tools/revenue-loss-calculator için
WebApplication + HowTo schema oluştur."
```

---

### `site-architecture` — Site Yapısı

URL yapısı, navigasyon, internal linking planlıyorsan.

**Örnek komut:**
```
"site-architecture skill'ini kullanarak
programmatic SEO sayfaları ekleyeceğimiz
bir URL yapısı ve internal linking stratejisi öner."
```

---

### `competitor-alternatives` — Rakip Karşılaştırma Sayfaları

En yüksek dönüşüm sağlayan sayfa tipi (kullanıcı zaten satın almak istiyor).

**Önce yap:**
```
"competitor-alternatives skill'ini kullanarak şu sayfaları strengthen et:
- AMZ Watcher alternative (mevcut, güçlendir)
- Pageradar alternative (oluştur)
- Lasso alternative (mevcut, güçlendir)
- 'broken link checker alternative'

Her sayfa: feature tablosu + fiyat karşılaştırması + ne zaman hangisi + CTA"
```

---

## 🎯 CRO Skill'leri

> Gelen trafiği kullanıcıya dönüştürür.

---

### `page-cro` — Sayfa Dönüşüm Optimizasyonu

Homepage, pricing veya herhangi bir sayfa düşük dönüşüyorsa.

**Örnek komut:**
```
"page-cro skill'ini kullanarak homepage'i analiz et.
Hedef: Ücretsiz kayıt veya Amazon Link Checker denemesi.
Trafik: Google organic, affiliate marketing aramaları.
Quick wins ve high-impact değişiklikler listele."
```

Kontrol edilmesi gerekenler:
- "15% of links break" istatistiği öne çıkıyor mu?
- "No credit card required" CTA'nın yanında mı?
- Free tool CTAları yeterince belirgin mi?

---

### `signup-flow-cro` — Kayıt Akışı Optimizasyonu

Dashboard kayıtları azsa veya signup formu optimize edilmemişse.

**Örnek komut:**
```
"signup-flow-cro skill'ini kullanarak
mevcut signup akışımı değerlendir.
Email + Password, email doğrulama gerekiyor.
Friction noktaları neler? Ne kaldırmalıyım?"
```

---

### `onboarding-cro` — Onboarding Optimizasyonu

Kullanıcılar kayıt olup ama tool'u kullanmıyorsa.

**Örnek komut:**
```
"onboarding-cro skill'ini kullanarak
Affiliate Link Monitor için ideal onboarding tasarla.
'Aha moment': İlk URL'yi taratıp bozuk link bulmak.
Bu aha moment'e nasıl en hızlı ulaştırırım?"
```

---

### `paywall-upgrade-cro` — Free → Pro Yükseltme

Free kullanıcıları Pro'ya ($12/mo) yükseltmek için.

**Örnek komut:**
```
"paywall-upgrade-cro skill'ini kullanarak
10 monitor limitini dolduran free kullanıcıya
en etkili upgrade prompt tasarla."
```

---

### `form-cro` — Form Optimizasyonu

Amazon/Linktree Checker araçlarındaki formu optimize etmek için.

**Örnek komut:**
```
"form-cro skill'ini kullanarak
/amazon-broken-link-checker sayfasındaki URL formunu incele.
Sonuç sonrası email alma dönüşümünü nasıl artırırım?"
```

---

### `popup-cro` — Popup Optimizasyonu

Exit-intent veya scroll popup eklemek istediğinde.

**Örnek komut:**
```
"popup-cro skill'ini kullanarak
blog sayfaları için exit-intent popup tasarla.
Hedef: Email signup veya free tool denemesi.
Copy ve tetikleyici öner."
```

---

### `ab-test-setup` — A/B Test Kurulumu

Değişikliği doğru test etmek için.

**Örnek komut:**
```
"ab-test-setup skill'ini kullanarak
homepage hero başlığı A/B testi kur.
A: 'Never Lose a Commission to a Broken Link Again'
B: '15% of Affiliate Links Break. Monitor Yours Automatically.'
Hangi metriği ölçmeliyim?"
```

---

## ✍️ Copy & Mesajlaşma Skill'leri

---

### `copywriting` — Marketing Copy

Herhangi bir sayfa için yeni copy yazmak.

**Önce yap:**
```
"copywriting skill'ini kullanarak
homepage için 5 farklı hero headline yaz.
Hedef: Affiliate marketer, Amazon Associates kullanıcısı.
Pain: Farkında olmadan komisyon kaybediyor.
Ürün: 60 saniyede alert gönderen monitoring tool."
```

---

### `copy-editing` — Copy Düzenleme

Blog yazısı veya sayfa kopyasını son rötuş için.

**Örnek komut:**
```
"copy-editing skill'ini kullanarak
/blog/affiliate-links-on-pinterest yazısını gözden geçir.
Buzzword'leri çıkar, passive voice'ları düzelt,
başlık ve CTA'ları güçlendir."
```

---

### `marketing-psychology` — Psikoloji Temelli Mesajlaşma

Neden dönüşüm olmadığını anlayamıyorsan.

**Örnek komut:**
```
"marketing-psychology skill'ini kullanarak
Affiliate Link Monitor için hangi psikolojik tetikleyiciler etkili?
Loss aversion (komisyon kaybı korkusu) en güçlü hangisi?
Pricing page'e nasıl entegre ederiz?"
```

---

## 📧 Email & İletişim Skill'leri

---

### `email-sequence` — Email Dizisi

**En yüksek ROI — önce yap:**

```
"email-sequence skill'ini kullanarak
free plan kaydı sonrası 7 günlük onboarding email serisi yaz:

Gün 0: Hoşgeldin + İlk linki nasıl eklersin
Gün 1: Bozuk link buldun mu? İşte ne yapmalısın
Gün 3: En çok bozulan link türleri (Amazon data)
Gün 5: Pro özellikleri tanıt (hourly monitoring)
Gün 7: Upgrade teklifi

Tone: Yardımcı, satışçı değil."
```

---

### `cold-email` — Soğuk Email

Büyük affiliate site sahipleri veya influencer'ları direkt contact etmek için.

**Örnek komut:**
```
"cold-email skill'ini kullanarak
Amazon Associates kullanan büyük blog sahiplerine
outreach email yaz.
Amaç: Ücretsiz denesin + affiliate partner olsun.
15% link breakage stat'ını kullan."
```

---

## 📱 Sosyal Medya Skill'leri

---

### `social-content` — Sosyal Medya İçeriği

**Özellikle Reddit için kritik:**

```
"social-content skill'ini kullanarak
r/affiliatemarketing, r/juststart, r/blogging için
organik, promotional olmayan hazır cevap şablonları yaz.
Konular: broken links, amazon associates, linktree optimization
Her subreddit için 5 varyasyon."
```

---

## 🚀 Growth Skill'leri

---

### `free-tool-strategy` — Ücretsiz Araç Stratejisi

**En önemli skill'lerden biri:**

```
"free-tool-strategy skill'ini kullanarak
mevcut free toolları analiz et:
- /amazon-broken-link-checker
- /check-linktree-links
- /pinterest-link-monitor
- /tools/revenue-loss-calculator

1. SEO trafik potansiyeli nedir?
2. Email capture nasıl optimize edilmeli?
3. Yapabileceğimiz 3 yeni free tool öner."
```

---

### `launch-strategy` — Lansman Stratejisi

Product Hunt lansmanı veya yeni özellik duyurusu için.

**Örnek komut:**
```
"launch-strategy skill'ini kullanarak
Product Hunt lansmanı için plan yaz.
Hedef: Top 5 Product of the Day.
Kanallar: Blog (7 yazı), Twitter, email listesi."
```

---

### `referral-program` — Referans Programı

İlk kullanıcılar geldikten sonra viral büyüme için.

**Örnek komut:**
```
"referral-program skill'ini kullanarak
Affiliate Link Monitor için referral program tasarla.
Not: Kullanıcılarım zaten affiliate marketer —
komisyon kazanmayı seviyorlar. Bu avantajı kullan."
```

---

### `pricing-strategy` — Fiyatlama

Free → Pro dönüşümü düşükse.

**Örnek komut:**
```
"pricing-strategy skill'ini kullanarak
mevcut pricing'i analiz et:
Free: 10 monitor, daily | Pro: $12/mo, 60 monitor, hourly
Bu doğru mu? Daha iyi tier sistemi var mı?"
```

---

### `marketing-ideas` — Pazarlama Fikirleri

Tıkandığında, yeni kanal ararken.

**Örnek komut:**
```
"marketing-ideas skill'ini kullanarak
$0 bütçeyle yapabileceğim
10 kullanıcı edinim taktiği öner.
Şu an: 0 kullanıcı, yeni site."
```

---

### `analytics-tracking` — Analitik Kurulumu

```
"analytics-tracking skill'ini kullanarak
kritik GA4 event'leri tanımla:
- Free tool kullanımı, Signup, İlk monitor (aha moment), Upgrade
Her birini nasıl track ederim?"
```

---

## 📅 Haftalık Eylem Planı (İlk 4 Hafta)

### Hafta 1 — SEO Temeli

| Skill | Aksiyon |
|-------|---------|
| `seo-audit` | Teknik SEO audit — indeksleme sorunu var mı? |
| `content-strategy` | 3 aylık content calendar |
| `programmatic-seo` | Etsy, ShareASale vb. checker page planı |
| `competitor-alternatives` | Pageradar alternative sayfası |
| `site-architecture` | Internal linking haritası |

### Hafta 2 — İçerik Üretimi

| Skill | Aksiyon |
|-------|---------|
| `copywriting` | Hero için 5 headline varyasyonu |
| `ai-seo` | 7 yazıyı AI-extractable yap |
| `content-strategy` | 2 yeni yazı konusu |
| `social-content` | Reddit için 5 hazır cevap şablonu |

### Hafta 3 — Dönüşüm Optimizasyonu

| Skill | Aksiyon |
|-------|---------|
| `page-cro` | Homepage CRO audit |
| `signup-flow-cro` | Signup flow analizi |
| `form-cro` | Free tool formları optimize et |
| `email-sequence` | 7 günlük onboarding email serisi |
| `popup-cro` | Blog exit-intent popup |

### Hafta 4 — Dağıtım

| Skill | Aksiyon |
|-------|---------|
| `free-tool-strategy` | Yeni free tool fikirleri |
| `marketing-ideas` | 10 no-budget taktik |
| `launch-strategy` | Product Hunt planı |
| `cold-email` | 10 büyük blogger'a outreach |
| `analytics-tracking` | GA4 event tracking |

---

## 🧩 Skill Zincirleri

```
Yeni Blog Yazısı:
content-strategy → copywriting → copy-editing → ai-seo → schema-markup

Yeni Landing Page:
copywriting → page-cro → form-cro → ab-test-setup

Programmatic SEO:
programmatic-seo → site-architecture → schema-markup → seo-audit

Kullanıcı Edinimi:
free-tool-strategy → social-content → cold-email → email-sequence

Dönüşüm Artırma:
page-cro → signup-flow-cro → onboarding-cro → paywall-upgrade-cro
```

---

## 🔥 Bugün Yapman Gereken 3 Şey

### 1. Reddit'e Gir (Bu Hafta)
`social-content` → r/affiliatemarketing, r/juststart topluluklarında yardımcı cevaplar yaz. Ürünü doğrudan tanıtma, profil linkinde olsun.

### 2. Programmatic SEO Sayfaları (Bu Ay)
`programmatic-seo` → Etsy, ShareASale, CJ için ayrı checker sayfaları. Her biri ayrı keyword = daha fazla organik kapı.

### 3. Product Hunt Launch (Önümüzdeki Ay)
`launch-strategy` → İyi bir PH günü = 500-2000 visitor. Planla ve hazırlan.

---

> **Not:** `product-marketing-context.md` oluşturursan her skill zaten ürünü tanır ve sormadan direkt aksiyona geçer.
