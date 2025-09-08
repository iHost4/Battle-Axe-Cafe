import { createClient } from '@supabase/supabase-js'

//my Supabase credentials
const supabaseUrl='https://aolnntuospvyvlprfeua.supabase.co'
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvbG5udHVvc3B2eXZscHJmZXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNjczMDksImV4cCI6MjA3MTg0MzMwOX0.yYvECSLL9rHRK9YtK0R7pzUzOmH760LA88ZU9pYdxl0'

export const supabase = createClient(supabaseUrl, supabaseKey)