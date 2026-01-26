import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wyimsniotcdjpicgozfl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aW1zbmlvdGNkanBpY2dvemZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMjcyNjgsImV4cCI6MjA4NDcwMzI2OH0.EiulkLUi2_IUz4BKyZbqyXxRZpD-S_-lpH4pApLgvhs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
