// Enter Supabase Information
const SUPABASE_URL = 'https://kxmmrwriuitalwrkjfpg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bW1yd3JpdWl0YWx3cmtqZnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIyOTc2MTgsImV4cCI6MTk2Nzg3MzYxOH0.FifnX44R83DRNIIvOYNAWTyoqlbl45PDPn8n0duFB7o';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });
    if (response.user) {
        return response.user;
    } else {
        //console.error(response.error);
    }
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('/');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page/index.html');
    }
}

export async function logout() {
    await client.auth.signOut();
    return (window.location.href = '/');
}
