import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://lfrbanpizphxpgkglfmj.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcmJhbnBpenBoeHBna2dsZm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNzk1NDgsImV4cCI6MTk4Mzg1NTU0OH0.LlfBSMTiRnkaxzqIEafwuLtjXzG0wQb4wdzyUod5HSw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}