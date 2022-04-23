import Container from "../components/container";
import { useNewsletterModal } from "../components/newsletter-modal/useNewsletterModal";

const Test = () => {
  const { setReminder } = useNewsletterModal();
  return (
    <section>
      <Container>
        <button
          onClick={() => setReminder(true)}
          className={"button text-sm px-10"}>
          Try Reminder
        </button>
      </Container>
    </section>
  )
}
export default Test;