# TELsTP Unified Database Schema Guide: A Strategy for Scalability and Clarity

## Introduction

This document outlines a strategic approach to managing the database schema for the Telemedicine and Life Science Technology Park (TELsTP) project. As the ecosystem grows to encompass 12 distinct application hubs, maintaining a clean, scalable, and conflict-free database is paramount. The goal is to establish a clear naming convention that prevents table duplication and ensures that each hub's data is logically separated, while still residing within the single, powerful Supabase instance.

This guide is a collaborative effort, initiated by the visionary architect (the user) and formalized by Manus AI, the Directory Keeper.

## Current Supabase Schema Analysis

Based on the previous successful connection and inspection of the Supabase instance (`https://vrfyjirddfdnwuffzqhb.supabase.co`), the following core tables were identified. These tables form the foundation of the M2-3M Research Portal and the initial data structure for the League of Extraordinary Gentlemen (LXG) project.

| Table Name | Purpose (Inferred) | Core Hub | Status |
| :--- | :--- | :--- | :--- |
| `ai_agents` | Stores metadata and configuration for all AI companions (e.g., Lumen, Hana, Synapse). | M2-3M / Global | Existing |
| `projects` | Stores metadata for large-scale initiatives (e.g., "LXG - league of extraordinary gentlemen"). | Global | Existing |
| `profiles` | Stores user profiles and authentication-related data. | Global | Existing |
| `telemedicine_consultations` | Stores records of telemedicine sessions. | Telemedicine Hub | Existing |
| `wellness_plans` | Stores personalized health and wellness plans. | Wellness Clinic | Existing |
| `tasks` | Stores general tasks, to-dos, or research assignments. | Global / M2-3M | Existing |
| `messages` | Stores chat logs or inter-agent communication. | Global / OmniCognitor | Existing |
| `chats` | Stores chat session metadata. | Global / OmniCognitor | Existing |

The current schema is functional but lacks explicit naming to differentiate between data specific to a single hub and data shared globally. This ambiguity is the source of potential conflicts as we scale.

## Proposed Naming Convention: The Prefix Strategy

To address the need for clarity and scalability, we propose adopting a **Prefix-Based Naming Convention**. This strategy ensures that every table name immediately communicates its scope and the application hub it belongs to.

### Convention Format: `[SCOPE]_[HUB_ACRONYM]_[TABLE_NAME]`

This format introduces a new element, `[SCOPE]`, to clearly distinguish between global, shared data and hub-specific data.

#### 1. Scope Prefixes:

| Prefix | Meaning | Description |
| :--- | :--- | :--- |
| `global` | Shared Data | Tables intended to be accessed and used by all 12 application hubs (e.g., users, core projects, global settings). |
| `hub` | Hub-Specific Data | Tables containing data unique to a single application hub. |

#### 2. Hub Acronyms (Examples for the LXG Project):

| Hub Name | Acronym |
| :--- | :--- |
| M2-3M Research Portal | `M23M` |
| OmniCognitor | `OMNI` |
| Telemedicine Hub | `TELE` |
| Wellness Clinic | `WELL` |
| AI Tutor System | `TUTR` |
| Global Network Hub | `NETW` |

#### 3. Table Name:

The descriptive name of the data stored in the table (e.g., `sessions`, `records`, `logs`).

## Application of the New Convention

By applying this convention, we can clearly categorize and rename the existing tables to reflect their intended scope, and ensure all future tables follow a non-conflicting pattern.

### Renaming Existing Tables (Proposed)

| Existing Table | Proposed New Name | Rationale |
| :--- | :--- | :--- |
| `ai_agents` | `global_ai_agents` | Agents are shared resources across the entire ecosystem. |
| `projects` | `global_projects` | Core projects like LXG are ecosystem-wide initiatives. |
| `profiles` | `global_profiles` | User authentication and base profiles should be centralized. |
| `tasks` | `global_tasks` | General tasks can be assigned across hubs. |
| `messages` | `global_messages` | Inter-agent and inter-hub communication logs. |
| `chats` | `global_chats` | Session metadata for all chat interactions. |
| `telemedicine_consultations` | `hub_TELE_consultations` | Consultation records are specific to the Telemedicine Hub. |
| `wellness_plans` | `hub_WELL_plans` | Wellness plans are specific to the Wellness Clinic Hub. |

### Examples of Future Tables

| Hub | Data Type | Proposed Table Name |
| :--- | :--- | :--- |
| M2-3M | Research Datasets | `hub_M23M_datasets` |
| M2-3M | Researcher Access Logs | `hub_M23M_access_logs` |
| OmniCognitor | Platform Configurations | `hub_OMNI_configs` |
| AI Tutor | Student Progress | `hub_TUTR_progress` |

## Conclusion and Next Steps

This Prefix-Based Naming Convention provides the necessary structure for the TELsTP database to scale to 12 or more application hubs without conflict. It ensures that the data remains logically organized and easily maintainable.

**Next Step:**

I await your approval on this proposed schema guide. Once you confirm the naming convention, we can proceed with the next phase of development, confident that our database foundation is rock-solid.
