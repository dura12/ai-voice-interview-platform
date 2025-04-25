import Agent from "@/components/agent";
const Page = async () => {
  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName='you'
        userId='user1'
        type="generate"
      />
    </>
  );
};

export default Page;