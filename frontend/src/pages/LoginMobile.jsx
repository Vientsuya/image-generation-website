import LoginForm from "../constants/components/login/loginForm"

export default function LoginMobile() {
    return (
        <main className="bg-center h-screen bg-[url('/loginbg.jpg')] flex justify-center items-center">
            <section className="bg-white flex flex-col items-center justify-center p-10 rounded-xl max-w-md w-full">
                <LoginForm />
            </section>
        </main>
    )
}