import { GrpcClientFactory } from '@kant2002-diia-inhouse/diia-app'

import { CryptoDocServiceDefinition } from '@kant2002-diia-inhouse/diia-crypto-client'
import DiiaLogger from '@kant2002-diia-inhouse/diia-logger'
import { MetricsService } from '@kant2002-diia-inhouse/diia-metrics'
import { mockInstance } from '@kant2002-diia-inhouse/test'

import { GrpcServiceName } from '@interfaces/application'

const grpcClientFactory = new GrpcClientFactory('User', new DiiaLogger(), mockInstance(MetricsService))

export const cryptoDocServiceClient = grpcClientFactory.createGrpcClient(CryptoDocServiceDefinition, 'test', GrpcServiceName.Crypto)
