import nookies from 'nookies';

export default function LogOut() {
  nookies.destroy(USER_TOKEN);
  return (<></>)
}

export async function getServerSideProps(context) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
}