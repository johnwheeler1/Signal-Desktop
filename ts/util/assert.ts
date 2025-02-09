// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { getEnvironment, Environment } from '../environment';
import * as log from '../logging/log';

/**
 * In production and beta, logs a warning and continues. For development it
 * starts the debugger.
 */
export function softAssert(condition: unknown, message: string): void {
  if (!condition) {
    if (getEnvironment() === Environment.Development) {
      debugger; // eslint-disable-line no-debugger
    }

    const err = new Error(message);
    log.warn('softAssert failure:', err && err.stack ? err.stack : err);
  }
}

/**
 * In production, logs an error and continues. In all other environments, throws an error.
 */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    const err = new Error(message);
    if (getEnvironment() !== Environment.Production) {
      if (getEnvironment() === Environment.Development) {
        debugger; // eslint-disable-line no-debugger
      }
      throw err;
    }
    log.error('assert failure:', err && err.stack ? err.stack : err);
  }
}

/**
 * Throws an error if the condition is falsy, regardless of environment.
 */

/**
 * Asserts an expression is true.
 *
 * @param value - An expression to assert is true.
 * @param message - An optional message for the assertion error thrown.
 */
export function strictAssert(value: boolean, message: string): asserts value;

/**
 * Asserts a nullable value is non-null.
 *
 * @param value - A nullable value to assert is non-null.
 * @param message - An optional message for the assertion error thrown.
 */
export function strictAssert<T>(
  value: T | null | undefined,
  message: string
): asserts value is T;

export function strictAssert(condition: unknown, message: string): void {
  if (condition === false || condition == null) {
    throw new Error(message);
  }
}

/**
 * Asserts that the type of value is not a promise.
 * (Useful for database modules)
 */
export function assertSync<T, X>(value: T extends Promise<X> ? never : T): T {
  return value;
}
