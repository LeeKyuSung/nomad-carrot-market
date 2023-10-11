import Button from "@/components/button";
import TextArea from "@/components/textarea";

export default function Write() {
  return (
    <form className="px-4">
      <TextArea required placeholder="Ask a question!" />
      <Button text="Submit" />
    </form>
  );
}
