import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	providers: [
		// OAuth authentication providers...
		FacebookProvider({
			clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
			clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET
		}),
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		})
	],
	callbacks: {
		// async redirect({ url, baseUrl }) {
		// 	console.log(url, baseUrl);
		// 	// Allows relative callback URLs
		// 	if (url.startsWith('/')) return `${baseUrl}${url}`;
		// 	// Allows callback URLs on the same origin
		// 	else if (new URL(url).origin === baseUrl) return url;
		// 	return baseUrl;
		// },
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.provider = account.provider;
			}
			// console.log(token, account);
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			session.provider = token.provider;
			return session;
		}
	}
};

export default NextAuth(authOptions);
