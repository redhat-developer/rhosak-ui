import type { KafkaRequest } from "@rhoas/kafka-management-sdk";
import type {
  CloudProvider,
  KafkaInstance,
  MarketPlaceSubscriptions,
  Plan,
  Status,
} from "ui";
import type { SizeWithLimits } from "./fetchProviderRegionSizes";

export type KafkaInstanceEnhanced = Required<KafkaInstance> & {
  request: KafkaRequest;
};

export function kafkaRequestToKafkaInstanceEnhanched(
  instance: KafkaRequest,
  marketplaceSubscriptions: MarketPlaceSubscriptions[],
  developerPlanInstanceLimits: SizeWithLimits[],
  standardPlanInstanceLimits: SizeWithLimits[]
): KafkaInstanceEnhanced {
  const enhancedInstance: KafkaInstanceEnhanced = {
    billing: undefined,
    connectionRate: 0,
    connections: 0,
    createdAt: instance.created_at || new Date().toISOString(),
    egress: 0,
    expiryDate: instance.expires_at as string | undefined,
    id: instance.id,
    ingress: 0,
    maxPartitions: 0,
    messageSize: 0,
    name: instance.name || "",
    owner: instance.owner || "",
    plan: instance.billing_model as Plan,
    provider: instance.cloud_provider as CloudProvider,
    region: instance.region || "",
    size: "1",
    status: apiStatusToUIStatus(instance.status || ""),
    storage: 0,
    updatedAt: instance.updated_at || new Date().toISOString(),
    request: instance,
    version: instance.version || "",
    bootstrapUrl: instance.bootstrap_server_host,
    adminUrl: instance.admin_api_server_url,
  };

  // update the billing info
  try {
    const marketplaceForBilling = marketplaceSubscriptions.find((ms) =>
      ms.subscriptions.find((s) => s === instance.billing_cloud_account_id)
    )?.marketplace;

    const billing: KafkaInstanceEnhanced["billing"] =
      instance.billing_model === "standard"
        ? "prepaid"
        : marketplaceForBilling && instance.billing_cloud_account_id
        ? {
            marketplace: marketplaceForBilling,
            subscription: instance.billing_cloud_account_id,
          }
        : undefined;
    enhancedInstance.billing = billing;
  } catch (e) {
    console.warn(
      "kafkaRequestToKafkaInstance",
      `couldn't retrieve the billing info for`,
      instance
    );
  }

  // update the limits
  try {
    const limits =
      instance.instance_type === "developer"
        ? developerPlanInstanceLimits
        : standardPlanInstanceLimits;
    const thisInstanceLimits = limits.find((l) => l.id === instance.size_id);
    if (thisInstanceLimits) {
      enhancedInstance.size = thisInstanceLimits.displayName;
      enhancedInstance.ingress = thisInstanceLimits.ingress;
      enhancedInstance.egress = thisInstanceLimits.egress;
      enhancedInstance.storage = instance.max_data_retention_size?.bytes;
      enhancedInstance.connections = thisInstanceLimits.connections;
      enhancedInstance.connectionRate = thisInstanceLimits.connectionRate;
      enhancedInstance.maxPartitions = thisInstanceLimits.maxPartitions;
      enhancedInstance.messageSize = thisInstanceLimits.messageSize;
    }
  } catch (e) {
    console.warn(
      "kafkaRequestToKafkaInstance",
      `couldn't retrieve the limits info for`,
      instance
    );
  }

  return enhancedInstance;
}

function apiStatusToUIStatus(status: string): Status {
  const mapping: { [key: string]: Status } = {
    accepted: "accepted",
    preparing: "preparing",
    provisioning: "provisioning",
    ready: "ready",
    failed: "degraded",
    deprovision: "deprovision",
    deleting: "deleting",
  };
  return mapping[status] || "degraded";
}
