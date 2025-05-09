import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { Authenticator, ConnectionOptions, NatsConnection, nkeyAuthenticator } from '@nats-io/nats-core';
import { connect } from "@nats-io/transport-node";
import util from 'util';
import { NatsCorePublishDescription } from './NatsCorePublish.description';

export class NatsCorePublishNode implements INodeType {

	description: INodeTypeDescription = NatsCorePublishDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;
		let subject: string;
		let message : any;
		let jsonParameters: boolean;
		let sendInputData: boolean;
		let queueGroupName: string;

		const credentials = await this.getCredentials('natsNkeyApi');
		const natsUrl = credentials?.natsUrl as string;
		const nKey = credentials?.nkey as string;
		const nSeed = credentials?.nSeed as string;

		let nc: NatsConnection;

		let auth : Authenticator | undefined = undefined;
		if ( !!nKey && !!nSeed) {
			auth = nkeyAuthenticator(new util.TextEncoder().encode(nSeed));
		}

		const opts : ConnectionOptions = {
			name: "n8n",
			servers: natsUrl,
			authenticator : auth,
			maxReconnectAttempts: 3,
			noEcho: true,

		};

		nc = await connect(opts);

		// Iterates over all input items
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				subject = this.getNodeParameter('subject', itemIndex, '') as string;
				message = this.getNodeParameter('message', itemIndex, '') as string;
				jsonParameters = this.getNodeParameter('jsonParameters', itemIndex, false) as boolean;
				sendInputData = this.getNodeParameter('sendInputData', itemIndex, true) as boolean;
				queueGroupName = this.getNodeParameter('queueGroupName', itemIndex, '') as string;

				console.log(queueGroupName);
				item = items[itemIndex];

				let payload: any = {};
				if (sendInputData) {
					payload = item.json;
				} else {
					if (jsonParameters){
						try {
							payload = JSON.parse(message);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), error, {
								itemIndex,
							});
						}
					} else {
						payload = message;
					}
				}

				await nc.publish( subject, payload);

				item.json = payload;
			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		// Close the connection
		if (!!nc){
			try {
				await nc.close();
			} catch {}
		}
		return [items];
	}
}
