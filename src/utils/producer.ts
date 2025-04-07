import { Producer } from "@/types/Producer";

export function isProducerListDifferent(
  producerListA: Producer[],
  producerListB: Producer[]
) {
  const oldProducerOptionsCodes = producerListA.map(
    (producer) => producer.producerCode
  );
  const newProducerOptionsCodes = producerListB.map(
    (producer) => producer.producerCode
  );

  return (
    oldProducerOptionsCodes.toString() !== newProducerOptionsCodes?.toString()
  );
}
