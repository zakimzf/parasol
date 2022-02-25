import Heading from "../components/heading";
import Markdown from 'markdown-to-jsx';

import PRIVACY_POLICY from '../content/privacy-policy.md';

export default () =>
  <>
    <Heading tagline={"Legal"} title={"Privacy Policy"}
      description={"How we collect and process your information."} />
    <section>
      <div className={"mx-auto max-w-3xl prose prose-lg prose-invert"}>
        <Markdown>{PRIVACY_POLICY}</Markdown>
      </div>
    </section>
  </>

