# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. A function `addFacilityIDToAgentByFacility` is called with the Facility's id, returning null.
   This function is to add its own customer id to its dependant agents for one facility. Looping all the Shifts within the facility, and for each loop, there will be a decendant loop for all agents working in the Shift. So time complexity will be 0(n\*n). In the loop of each agent, if it has already assigned the facility id, we can skip reassigning. That's how we can have one facility updated with the agents which will have its id.
2. A function `addFacilityIDsToAgents` is called with facility IDs, returning null.
   This function is to add facility IDs to all the agents in database with facility IDs. Looping all facility IDs, addFacilityIDToAgentByFacility is being called.
   That's how for all the facilities we can add their own custom ids for each Agent they work with.
   Overall, the time complexity for this adding facility IDs logic is 0(n*n*n).
3. Refactor function `generateReport` to update IDs to be shown on PDF reports with the facility IDs list.
