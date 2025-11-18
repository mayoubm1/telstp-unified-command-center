#!/usr/bin/env python3
"""
Database Schema Inspector for M2-3M System
TELsTP - Telemedicine and Life Science Technology Park

This script inspects the actual database schema to understand
the table structure and column names.
"""

import json
from supabase import create_client

def inspect_database_schema():
    """Inspect the actual database schema"""
    
    # Initialize Supabase client
    supabase_url = "https://vrfyjirddfdnwuffzqhb.supabase.co"
    supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE"
    
    supabase = create_client(supabase_url, supabase_key)
    
    print("🔍 Inspecting M2-3M Database Schema")
    print("=" * 50)
    
    # Inspect ai_agents table
    print("\n🤖 AI Agents Table Structure:")
    try:
        result = supabase.table('ai_agents').select('*').limit(1).execute()
        if result.data:
            agent = result.data[0]
            print(f"   Columns found: {list(agent.keys())}")
            print(f"   Sample data: {json.dumps(agent, indent=2, default=str)}")
        else:
            print("   No data found in ai_agents table")
    except Exception as e:
        print(f"   Error: {e}")
    
    # Inspect projects table
    print("\n📁 Projects Table Structure:")
    try:
        result = supabase.table('projects').select('*').limit(1).execute()
        if result.data:
            project = result.data[0]
            print(f"   Columns found: {list(project.keys())}")
            print(f"   Sample data: {json.dumps(project, indent=2, default=str)}")
        else:
            print("   No data found in projects table")
    except Exception as e:
        print(f"   Error: {e}")
    
    # Try to get all table names
    print("\n📋 Available Tables:")
    try:
        # This might not work with anon key, but let's try
        result = supabase.rpc('get_table_names').execute()
        if result.data:
            print(f"   Tables: {result.data}")
    except Exception as e:
        print(f"   Could not retrieve table names: {e}")
        
        # Try alternative method - check common table names
        common_tables = [
            'ai_agents', 'projects', 'users', 'profiles', 'ai_models', 
            'ai_interactions', 'patients', 'healthcare_providers', 
            'appointments', 'medical_records', 'teleconsultations',
            'messages', 'research_projects', 'datasets', 'collaborations',
            'research_outputs', 'api_keys'
        ]
        
        print("   Checking common table names:")
        for table in common_tables:
            try:
                result = supabase.table(table).select('*').limit(1).execute()
                print(f"   ✅ {table}: {len(result.data)} records found")
                if result.data:
                    print(f"      Columns: {list(result.data[0].keys())}")
            except Exception as e:
                print(f"   ❌ {table}: Not accessible or doesn't exist")
    
    # Get detailed info about ai_agents
    print("\n🔍 Detailed AI Agents Analysis:")
    try:
        result = supabase.table('ai_agents').select('*').execute()
        agents = result.data
        
        print(f"   Total agents: {len(agents)}")
        
        if agents:
            # Analyze the structure
            all_keys = set()
            for agent in agents:
                all_keys.update(agent.keys())
            
            print(f"   All possible columns: {sorted(list(all_keys))}")
            
            # Show a few examples
            print(f"\n   First 3 agents:")
            for i, agent in enumerate(agents[:3]):
                print(f"   Agent {i+1}: {json.dumps(agent, indent=4, default=str)}")
                
    except Exception as e:
        print(f"   Error analyzing ai_agents: {e}")

if __name__ == "__main__":
    inspect_database_schema()

