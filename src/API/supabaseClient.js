import { createClient } from '@supabase/supabase-js'

//my Supabase credentials
const supabaseUrl=process.env.REACT_APP_SUPABASE_URL
const supabaseKey=process.env.REACT_APP_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)