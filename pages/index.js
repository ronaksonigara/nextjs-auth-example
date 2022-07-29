import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
	const { data: session } = useSession();

	console.log(session);
	if (session) {
		return (
			<>
				Signed in as {session.user.name}
				<br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn('google')}>google</button>
			<button onClick={() => signIn('facebook')}>Facebook</button>
		</>
	);
}
