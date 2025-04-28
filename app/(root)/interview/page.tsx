import Agent from "@/components/agent";
import {getCurrentUser} from "../../../lib/actions/auth.actions";
const Page = async () => {
  const user = await getCurrentUser();
  console.log(user)
  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user?.name}
        userId={user?.id}
        type="generate"
      />
    </>
  );
};

export default Page;