// export const useCheckStandardQuota = ({
//   onNoQuotaAvailable,
//   onOutOfQuota,
//   onQuotaAvailable,
// }: Parameters<CreateKafkaInstanceServices["checkStandardQuota"]>[0]) => {
//   const { data, isError } = fetchStandardQuota();
//   useEffect(() => {
//     if (data) {
//       const {
//         hasTrialQuota,
//         remainingPrepaidQuota,
//         remainingMarketplaceQuota,
//         marketplaceSubscriptions,
//       } = data;
//
//       if (
//         remainingMarketplaceQuota !== undefined ||
//         remainingPrepaidQuota !== undefined
//       ) {
//         if (
//           (remainingMarketplaceQuota || 0) === 0 &&
//           (remainingPrepaidQuota || 0) === 0
//         ) {
//           onOutOfQuota({
//             quota: {
//               marketplaceSubscriptions,
//             },
//           });
//         } else {
//           onQuotaAvailable({
//             quota: {
//               remainingPrepaidQuota,
//               remainingMarketplaceQuota,
//               marketplaceSubscriptions,
//             },
//           });
//         }
//       } else {
//         onNoQuotaAvailable({ hasTrialQuota });
//       }
//     }
//     if (isError) {
//       onNoQuotaAvailable({ hasTrialQuota: false });
//     }
//   }, [data, isError, onNoQuotaAvailable, onOutOfQuota, onQuotaAvailable]);
// };
