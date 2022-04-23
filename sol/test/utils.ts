import { ContractReceipt } from "ethers";

export function findEventByName(
  txReceipt: ContractReceipt,
  eventName: string,
  ...eventFields: any
): any {
  const event: any = parseEvent(txReceipt, eventName);

  const resultObj: any = {
    txHash: txReceipt.transactionHash,
  };

  for (let index = 0; index < eventFields.length; index++) {
    resultObj[eventFields[index]] = event?.args[eventFields[index]].toString();
  }
  return resultObj;
}

export function getParamFromTxEvent(
  txReceipt: ContractReceipt,
  eventName: string,
  param: string
): any {
  const event: any = parseEvent(txReceipt, eventName);
  const p = event?.args[param];

  if (!p) {
    throw new Error(`Param ${param} could not be found!`);
  }

  return p.toString();
}

function parseEvent(txReceipt: ContractReceipt, eventName: string) {
  const event: any = txReceipt.events?.filter((e) => e.event === eventName)[0];
  if (!event) {
    throw new Error(`Event ${eventName} could not be found!`);
  }

  return event;
}
