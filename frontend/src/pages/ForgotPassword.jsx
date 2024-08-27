import ForgotPasswordForm from "../constants/components/forgotPassword/forgotPasswordForm"

export default function ForgotPassword() {
    return (
        <main className="bg-center h-screen bg-[url('/loginbg.jpg')] flex justify-center items-center">
            <section className="bg-white flex flex-col items-center justify-center p-10 rounded-xl max-w-md w-full">
                <ForgotPasswordForm />
            </section>
        </main>
    )
}