import Button from "@/components/button";
import Input from "@/components/input";
import TextArea from "@/components/textarea";

export default function Create() {
  return (
    <form className="space-y-4 px-4">
      <Input required label="Name" name="name" type="text" />
      <Input
        required
        label="Price"
        placeholder="0.00"
        name="price"
        type="text"
        kind="price"
      />
      <TextArea name="description" label="Description" />
      <Button text="Go live" />
    </form>
  );
}
