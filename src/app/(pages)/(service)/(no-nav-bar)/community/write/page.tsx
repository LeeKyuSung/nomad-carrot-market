import AppBar from "@/components/app-bar";
import Button from "@/components/button";
import TextArea from "@/components/textarea";

export default function Write() {
  return (
    <AppBar title="동네생활 글쓰기" canGoBack>
      <form className="px-4">
        <TextArea required placeholder="Ask a question!" />
        <Button text="Submit" />
      </form>
    </AppBar>
  );
}
