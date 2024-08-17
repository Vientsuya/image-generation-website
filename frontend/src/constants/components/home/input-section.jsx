import Input from "./input"

export default function InputSection() {
    return (
    <>
        <div className="space-y-4">
        <Input type="text" placeholder="Kot w czapce" />
        <Input type="text" placeholder="-niebieski" />
        <Input type="submit" value="Wygeneruj" />
        </div>
    </>
    )
}