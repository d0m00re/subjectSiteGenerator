import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BACKEND_URL } from "@/lib/constants";
import { me } from "@/network/user.network";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};
const ProfilePage = async (props: Props) => {
    const session = await getServerSession(authOptions);
    const response = await me({id : props.params.id, accessToken : props.params.id})

    const user = await response.json();
  
    console.log("user fetch : ", props.params.id)
    console.log(user)

    return (
      <div className="m-2 border rounded shadow overflow-hidden">
        <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
          User Profile
        </div>
  
        <div className="grid grid-cols-2  p-2 gap-2">
          <p className="p-2 text-slate-400">Name:</p>
          <p className="p-2 text-slate-950">{user.name}</p>
          <p className="p-2 text-slate-400">Email:</p>
          <p className="p-2 text-slate-950">{user.email}</p>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;