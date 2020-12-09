import { BigInt } from "@graphprotocol/graph-ts"
import {
  Dark_Token,
  Approval,
  DelegateChanged,
  DelegateVotesChanged,
  Transfer
} from "../generated/Dark_Token/Dark_Token"
import {
    _Approval, _DelegateChanged, _DelegateVotesChanged, _Transfer
} from "../generated/schema"

export function handleApproval(event: Approval): void {
    let entity = _Approval.load(event.params.value.toHex())

    if (entity == null) {
        entity = new _Approval(event.params.value.toHex())
        entity.count = BigInt.fromI32(0)
    }

    entity.count = entity.count + BigInt.fromI32(1)
    entity._owner = event.params.owner
    entity._spender = event.params.spender
    entity._value = event.params.value
    entity.save()
}

export function handleDelegateChanged(event: DelegateChanged): void {
    let entity = _DelegateChanged.load(event.params.delegator.toHex())

    if (entity == null) {
        entity = new _DelegateChanged(event.params.delegator.toHex())
        entity.count = BigInt.fromI32(0)
    }

    entity.count = entity.count + BigInt.fromI32(1)
    entity._delegator = event.params.delegator
    entity._fromDelegate = event.params.fromDelegate
    entity._toDelegate = event.params.toDelegate
    entity.save()
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
    let entity = _DelegateVotesChanged.load(event.params.delegate.toHex())

    if (entity == null) {
        entity = new _DelegateVotesChanged(event.params.delegate.toHex())
        entity.count = BigInt.fromI32(0)
    }

    entity.count = entity.count + BigInt.fromI32(1)
    entity._delegate = event.params.delegate
    entity._previousBalance = event.params.previousBalance
    entity._newBalance = event.params.newBalance
    entity.save()
}

export function handleTransfer(event: Transfer): void {
    let entity = _Transfer.load(event.params.value.toHex())

    if (entity == null) {
        entity = new _Transfer(event.params.value.toHex())
        entity.count = BigInt.fromI32(0)
    }

    entity.count = entity.count + BigInt.fromI32(1)
    entity._from = event.params.from
    entity._to = event.params.to
    entity._value = event.params.value
    entity.save()
}
