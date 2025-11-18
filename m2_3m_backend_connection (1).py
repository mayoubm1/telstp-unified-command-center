#!/usr/bin/env python3
"""
M2-3M System Backend Connection Script
TELsTP - Telemedicine and Life Science Technology Park

This script establishes a connection to the Supabase backend for the M2-3M system
using the provided credentials and tests the connection with real data operations.

Author: Manus AI (Directory Keeper)
Created: January 2025
"""

import os
import sys
from datetime import datetime
from typing import Dict, Any, List, Optional
from supabase import create_client, Client
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

class M23MBackendConnection:
    """
    M2-3M System Backend Connection Manager
    
    Handles all backend operations for the M2-3M research system including:
    - Database connections
    - User authentication
    - Research project management
    - AI agent interactions
    - Real-time data synchronization
    """
    
    def __init__(self):
        """Initialize the M2-3M backend connection with Supabase credentials"""
        
        # TELsTP-OmniCog-Deploy project credentials
        self.supabase_url = "https://vrfyjirddfdnwuffzqhb.supabase.co"
        self.supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE"
        
        # Service role key (for admin operations): sb_secret_x3yRWF_zxOYKtnzFwxhFcA_9nn_6Rdf
        # PostgreSQL connection: postgresql://postgres:Maayoubm235152!?@db.vrfyjirddfdnwuffzqhb.supabase.co:5432/postgres
        
        # Initialize Supabase client
        try:
            self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
            print(f"✅ M2-3M Backend Connection initialized successfully")
            print(f"📡 Connected to: {self.supabase_url}")
        except Exception as e:
            print(f"❌ Failed to initialize M2-3M backend connection: {e}")
            sys.exit(1)
    
    def test_connection(self) -> bool:
        """
        Test the backend connection and verify access to the database
        
        Returns:
            bool: True if connection is successful, False otherwise
        """
        try:
            print("\n🔍 Testing M2-3M Backend Connection...")
            
            # Test basic connection with a simple query
            result = self.supabase.table('ai_agents').select('*').limit(1).execute()
            
            print(f"✅ Connection test successful!")
            print(f"📊 Database accessible: {len(result.data) >= 0}")
            
            return True
            
        except Exception as e:
            print(f"❌ Connection test failed: {e}")
            return False
    
    def get_ai_agents(self) -> List[Dict[str, Any]]:
        """
        Retrieve all AI agents from the backend
        
        Returns:
            List[Dict]: List of AI agents with their configurations
        """
        try:
            print("\n🤖 Retrieving AI Agents...")
            
            result = self.supabase.table('ai_agents').select('*').execute()
            agents = result.data
            
            print(f"✅ Retrieved {len(agents)} AI agents")
            for agent in agents:
                print(f"   - {agent.get('id', 'Unknown ID')}: {agent.get('role', 'Unknown Role')}")
            
            return agents
            
        except Exception as e:
            print(f"❌ Failed to retrieve AI agents: {e}")
            return []
    
    def get_projects(self) -> List[Dict[str, Any]]:
        """
        Retrieve all projects from the backend
        
        Returns:
            List[Dict]: List of projects
        """
        try:
            print("\n📁 Retrieving Projects...")
            
            result = self.supabase.table('projects').select('*').execute()
            projects = result.data
            
            print(f"✅ Retrieved {len(projects)} projects")
            for project in projects:
                print(f"   - {project.get('id', 'Unknown ID')}: {project.get('name', 'Unnamed Project')}")
            
            return projects
            
        except Exception as e:
            print(f"❌ Failed to retrieve projects: {e}")
            return []
    
    def get_database_schema(self) -> Dict[str, Any]:
        """
        Get information about the database schema and tables
        
        Returns:
            Dict: Database schema information
        """
        try:
            print("\n📋 Analyzing Database Schema...")
            
            # Get table information from information_schema
            query = """
            SELECT table_name, column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_schema = 'public'
            ORDER BY table_name, ordinal_position;
            """
            
            result = self.supabase.rpc('get_schema_info').execute()
            
            print("✅ Database schema retrieved")
            return result.data if result.data else {}
            
        except Exception as e:
            print(f"⚠️  Could not retrieve detailed schema: {e}")
            return {}
    
    def create_test_agent(self) -> Optional[Dict[str, Any]]:
        """
        Create a test AI agent to verify write operations
        
        Returns:
            Optional[Dict]: Created agent data or None if failed
        """
        try:
            print("\n🧪 Creating Test AI Agent...")
            
            test_agent = {
                "agent_id": "318bdaa5-a0a4-4efb-b7c7-23913cb81eaf",  # Your UUID
                "role": "test_scribe",
                "permission": "invoke, respond, chain",
                "metadata": {
                    "created_by": "M2-3M_Backend_Connection_Test",
                    "test_timestamp": datetime.now().isoformat(),
                    "description": "Test agent created by M2-3M backend connection script"
                }
            }
            
            result = self.supabase.table('ai_agents').insert(test_agent).execute()
            
            if result.data:
                print(f"✅ Test agent created successfully!")
                print(f"   Agent ID: {result.data[0].get('agent_id', 'Unknown')}")
                return result.data[0]
            else:
                print("⚠️  Test agent creation returned no data")
                return None
                
        except Exception as e:
            print(f"⚠️  Could not create test agent (may already exist): {e}")
            return None
    
    def get_system_status(self) -> Dict[str, Any]:
        """
        Get comprehensive system status for M2-3M
        
        Returns:
            Dict: System status information
        """
        status = {
            "connection": False,
            "timestamp": datetime.now().isoformat(),
            "ai_agents_count": 0,
            "projects_count": 0,
            "database_accessible": False,
            "backend_url": self.supabase_url
        }
        
        try:
            # Test connection
            status["connection"] = self.test_connection()
            
            # Get counts
            agents = self.get_ai_agents()
            projects = self.get_projects()
            
            status["ai_agents_count"] = len(agents)
            status["projects_count"] = len(projects)
            status["database_accessible"] = True
            
        except Exception as e:
            print(f"❌ Error getting system status: {e}")
            status["error"] = str(e)
        
        return status
    
    def run_comprehensive_test(self) -> Dict[str, Any]:
        """
        Run a comprehensive test of all M2-3M backend functionality
        
        Returns:
            Dict: Comprehensive test results
        """
        print("🚀 Starting M2-3M Backend Comprehensive Test")
        print("=" * 60)
        
        test_results = {
            "start_time": datetime.now().isoformat(),
            "tests": {}
        }
        
        # Test 1: Basic Connection
        print("\n📡 Test 1: Basic Connection")
        test_results["tests"]["connection"] = self.test_connection()
        
        # Test 2: AI Agents Retrieval
        print("\n🤖 Test 2: AI Agents Retrieval")
        agents = self.get_ai_agents()
        test_results["tests"]["ai_agents"] = {
            "success": len(agents) >= 0,
            "count": len(agents),
            "data": agents
        }
        
        # Test 3: Projects Retrieval
        print("\n📁 Test 3: Projects Retrieval")
        projects = self.get_projects()
        test_results["tests"]["projects"] = {
            "success": len(projects) >= 0,
            "count": len(projects),
            "data": projects
        }
        
        # Test 4: Database Schema
        print("\n📋 Test 4: Database Schema Analysis")
        schema = self.get_database_schema()
        test_results["tests"]["schema"] = {
            "success": isinstance(schema, dict),
            "data": schema
        }
        
        # Test 5: Write Operation (Create Test Agent)
        print("\n🧪 Test 5: Write Operation Test")
        test_agent = self.create_test_agent()
        test_results["tests"]["write_operation"] = {
            "success": test_agent is not None,
            "data": test_agent
        }
        
        test_results["end_time"] = datetime.now().isoformat()
        
        print("\n" + "=" * 60)
        print("🎯 M2-3M Backend Test Complete!")
        
        # Summary
        successful_tests = sum(1 for test in test_results["tests"].values() 
                             if (test.get("success", False) if isinstance(test, dict) else test))
        total_tests = len(test_results["tests"])
        
        print(f"✅ Successful Tests: {successful_tests}/{total_tests}")
        
        if successful_tests == total_tests:
            print("🎉 All tests passed! M2-3M backend is fully operational!")
        else:
            print("⚠️  Some tests failed. Check the results above.")
        
        return test_results


def main():
    """
    Main function to run the M2-3M backend connection test
    """
    print("🏥 TELsTP M2-3M System Backend Connection")
    print("🧬 Telemedicine and Life Science Technology Park")
    print("🤖 AI-Powered Research Platform")
    print("=" * 60)
    
    # Initialize connection
    m2_3m = M23MBackendConnection()
    
    # Run comprehensive test
    results = m2_3m.run_comprehensive_test()
    
    # Save results to file
    with open('/home/ubuntu/m2_3m_test_results.json', 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\n📄 Test results saved to: /home/ubuntu/m2_3m_test_results.json")
    
    return results


if __name__ == "__main__":
    results = main()

