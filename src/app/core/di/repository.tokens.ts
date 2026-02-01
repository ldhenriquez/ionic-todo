import { InjectionToken } from '@angular/core';

import { TasksRepository } from '../../domain/repositories/tasks.repository';
import { CategoriesRepository } from '../../domain/repositories/categories.repository';

/**
 * DI tokens for repository abstractions.
 *
 * Angular cannot inject TypeScript interfaces at runtime, so we expose explicit
 * injection tokens and bind them to concrete implementations in AppModule.
 */

export const TASKS_REPOSITORY = new InjectionToken<TasksRepository>('TASKS_REPOSITORY');
export const CATEGORIES_REPOSITORY = new InjectionToken<CategoriesRepository>('CATEGORIES_REPOSITORY');
