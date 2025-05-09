import { ICredentialType, INodeProperties } from 'n8n-workflow';


export class NatsNKeyApi implements ICredentialType {
	displayName: string = 'NATS Nkey API';
	name: string = 'natsNkeyApi';
	properties: INodeProperties[] = [
		{
			displayName: 'NATS URL',
			name: 'natsUrl',
			type: 'string',
			default: '',
			placeholder: 'nats://localhost:4222',
			description: 'NATS URL',
		},
		{
			displayName: 'NKey',
			name: 'nKey',
			type: "string",
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'your public key here',
			description: 'NATS NKey',
		},
		{
			displayName: 'Seed',
			name: 'nSeed',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder:
				'your private seed here',
			description: 'Private Seed',
		},

	];


}
