import { getProviders, signIn } from "next-auth/react";
import GoogleButton from 'react-google-button'


export default function signin({ providers }) {

  return (
    <div className="flex justify-center mt-20 space-x-4">
      <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="Dophin image inside a phone"
        className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
      />
      <div className="">
        {Object.values(providers||{}).map((provider,id) => (
          <div className="flex flex-col items-center" key={id}>
            <img
              className="w-36 object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dolphin-logo.svg/2048px-Dolphin-logo.svg.png"
              alt="Dophin logo"
            />
            <p className="text-center text-sm italic my-10">
              This app is created for learning purposes
            </p>
          
            <GoogleButton lable={`Sign in with ${provider.name}`} type="light"
             onClick={() => signIn(provider.id, { callbackUrl: "/" })}/>
          </div>
        ))}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}