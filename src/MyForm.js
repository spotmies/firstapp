import { Prompt } from "react-router-dom";

function MyForm() {
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);
  return (
    <div>
      <form>Nothing</form>

      <Prompt
        when={isFormIncomplete}
        message="Would to like to give a feedback?"
      />
    </div>
  );
}
