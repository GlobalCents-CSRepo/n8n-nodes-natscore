import { INodeTypeDescription } from 'n8n-workflow';

export const NatsCorePublishDescription: INodeTypeDescription = {
	displayName: 'NATS Core Publish',
	name: 'natsCorePublish',
	icon: 'file:nats.svg',
	group: ['transform'],
	version: 1,
	description: 'Sends messages to a NATS.io Server',
	defaults: {
		name: 'NATS Core Publish',
	},
	inputs: ['main'],
	outputs: ['main'],
	credentials: [
		{
			name: 'natsNkeyApi',
			required: false,
		},
	],
	properties: [
		{
			displayName: 'Subject',
			name: 'subject',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'subject-name',
			description: 'Name of the queue of subject to publish to',
		},
		{
			displayName: 'Message',
			name: 'message',
			type: 'string',
			default: '',
			description:
				'The message to be sent. Can be JSON or a string. If JSON, set the "JSON Parameters" option.',
		},
		{
			displayName: 'JSON Parameters',
			name: 'jsonParameters',
			type: 'boolean',
			default: false,
		},
		{
			displayName: 'Send Input Data',
			name: 'sendInputData',
			type: 'boolean',
			default: true,
			description: 'Whether to send the the data the node receives as JSON to NATS Core'
		},
		{
			displayName: 'Queue Group Name',
			name: 'queueGroupName',
			type: 'string',
			default: '',
			description: 'The name of the queue group to use'
		}
	]
}
