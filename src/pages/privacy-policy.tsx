import Markdown from "markdown-to-jsx";

import Heading from "../components/heading";
import PRIVACY_POLICY from "../content/privacy-policy.md";

const PrivacyPolicy = () => (
  <>
    <Heading tagline={"Legal"} title={"Privacy Policy"}
      description={"How we collect and process your information."} />
    <section>
      <div className={"mx-auto max-w-3xl prose prose-lg prose-invert"}>
        <Markdown>{PRIVACY_POLICY}</Markdown>
      </div>
    </section>
  </>
)

export default PrivacyPolicy;