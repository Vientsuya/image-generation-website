import RegisterForm from "../constants/components/register/registerForm"

export default function Register() {
    return (
        <main className="bg-center h-screen bg-[url('/loginbg.jpg')] flex justify-center items-center">
            <section className="bg-white flex flex-col items-center justify-center p-10 rounded-xl max-w-md w-full">
                <RegisterForm />
            </section>
        </main>
    )
}