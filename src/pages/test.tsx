import Container from "../components/container";
import { useNewsletterModal } from "../components/newsletter-modal/useNewsletterModal";

const Test = () => {
  const { setVisible } = useNewsletterModal();
  return (
    <section>
      <Container>
        <button
          onClick={() => setVisible(true)}
          className={"button text-sm px-10"}>
          Try Reminder
        </button>
      </Container>
    </section>
  )
}
export default Test;