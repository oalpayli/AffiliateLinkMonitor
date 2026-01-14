import { createClient } from '@supabase/supabase-js';

// Admin client for server-side operations (can bypass RLS)
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

/**
 * Find user by email using Supabase Admin API
 * Used in webhooks when we only have email but need userId
 */
export async function getUserIdByEmail(email: string): Promise<string | null> {
    try {
        const { data, error } = await supabaseAdmin.auth.admin.listUsers();

        if (error) {
            console.error('[SUPABASE ADMIN] Error listing users:', error);
            return null;
        }

        const user = data.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

        if (user) {
            console.log('[SUPABASE ADMIN] Found user by email:', user.id);
            return user.id;
        }

        console.log('[SUPABASE ADMIN] No user found with email:', email);
        return null;
    } catch (error) {
        console.error('[SUPABASE ADMIN] Exception finding user:', error);
        return null;
    }
}
