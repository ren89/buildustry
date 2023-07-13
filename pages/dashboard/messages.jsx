import DashboardLayout from '@/components/dashboard-layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
	useMutation,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Messages = () => {
	const [message, setMessage] = useState('');

	const {
		data: messages,
		refetch,
		isLoading: messageLoading,
	} = useQuery(['messages'], async () => {
		// Change the sender ID to id of receiver of message
		const { data } = await axios.get(
			'/api/messages?senderId=cljy8a1r90000v4bgf0whhps5'
		);
		return data;
	});

	const { mutate } = useMutation(
		async (newMessage) => {
			// Change the sender ID to id of receiver of message
			axios.post('/api/messages?receiverId=cljy8a1r90000v4bgf0whhps5', {
				content: newMessage,
			});
		},
		{ onSuccess: () => refetch() }
	);

	useEffect(() => {
		const socket = socketIOClient('/api');

		socket.on('message', () => {
			refetch();
		});

		return () => {
			socket.disconnect();
		};
	}, [refetch]);

	const sendMessage = async (e) => {
		e.preventDefault();
		mutate(message);
		setMessage('');
	};

	return (
		<DashboardLayout>
			<div>
				<div>
					{!messageLoading ? (
						<div className="w-80">
							{messages?.map((message) => (
								<p key={message.id}>
									<span className="font-bold">
										{message.sender.firstName} {message.sender.lastName}:
									</span>{' '}
									{message.content}
								</p>
							))}
						</div>
					) : null}
				</div>
				<div>
					<form onSubmit={sendMessage} className="flex flex-row">
						<input
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button
							type="submit"
							className="shadow bg-primary text-primary-foreground hover:bg-primary/90"
						>
							Send
						</button>
					</form>
				</div>
			</div>
		</DashboardLayout>
	);
};

// Wrap your component with the QueryClientProvider
export default function WrappedMessage() {
	return (
		<QueryClientProvider client={queryClient}>
			<Messages />
		</QueryClientProvider>
	);
}
