import type { KafkaRequest } from '@rhoas/kafka-management-sdk';
import  {kafkaRequestToKafkaInstanceEnhanched} from './kafkaRequestToKafkaInstanceEnhanched';
import type { MarketPlaceSubscriptions } from 'ui-models/src/models/kafka';
import type { SizeWithLimits } from '../fetchers';

describe('kafkaRequestToKafkaInstanceEnhanced', () => {
  const instance: KafkaRequest = {
    id: '1',
    name: 'test-kafka',
    owner: 'test-owner',
    instance_type: "developer",
    cloud_provider: 'aws',
    region: 'us-west-2',
    status: 'ready',
    created_at: '2022-01-01T00:00:00.000Z',
    updated_at: '2022-01-01T00:00:00.000Z',
    expires_at: '2023-01-01T00:00:00.000Z',
    billing_cloud_account_id: '1234',
    billing_model: 'standard',
    bootstrap_server_host: 'test-bootstrap-url',
    admin_api_server_url: 'test-admin-url',
    version: '2.8',
    multi_az: true,
    max_data_retention_size: {
      bytes: 1073741824,
    },
    size_id: '1',
    reauthentication_enabled: true,
    kind: 'Kafka',
    href: ''
  };

  const marketplaceSubscriptions: MarketPlaceSubscriptions[] = [
    {
      marketplace: "aws",
      subscriptions: [""]
    
    },
  ];

  const developerPlanInstanceLimits: SizeWithLimits[] = [
    {
      id: "1",
      displayName: "dev-plan",
      status: "stable",
      quota: 1,
      ingress: 10,
      egress: 10,
      storage: 20,
      connections: 1,
      connectionRate: 1,
      maxPartitions: 1,
      messageSize: 1024,
      isDisabled: false,
      trialDurationHours: 24,
      
    },
  ];

  const standardPlanInstanceLimits:  SizeWithLimits[] = [
    {
      id: "1",
      displayName: "standard-plan",
      status: "stable",
      quota: 1,
      ingress: 10,
      egress: 10,
      storage: 20,
      connections: 100,
      connectionRate: 100,
      maxPartitions: 10,
      messageSize: 10240,
      isDisabled: false,
      trialDurationHours: 48,    
    },
  ];

  const expectedOutput = {
    billing: 'prepaid',
    connectionRate: 1,
    connections: 1,
    createdAt: '2022-01-01T00:00:00.000Z',
    egress: 10,
    expiryDate: '2023-01-01T00:00:00.000Z',
    id: '1',
    ingress: 10,
    maxPartitions: 1,
    messageSize: { type: 'bytes', value: BigInt(1024) },
    name: 'test-kafka',
    owner: 'test-owner',
    plan: 'developer',
    provider: 'aws',
    region: 'us-west-2',
    status: 'ready',
    storage: { type: 'bytes', value: BigInt(1073741824) },
    updatedAt: '2022-01-01T00:00:00.000Z',
    version: '2.8',
    bootstrapUrl: 'test-bootstrap-url',
    adminUrl: 'test-admin-url',
    az: 'multi',
  };

  test('should return the enhanced kafka instance with correct data', () => {
    const enhancedInstance = kafkaRequestToKafkaInstanceEnhanched(
      instance,
      marketplaceSubscriptions,
      developerPlanInstanceLimits,
      standardPlanInstanceLimits
    );
    expect(enhancedInstance).toEqual(expectedOutput);
  });
});
