from pymongo import MongoClient
from faker import Faker
import random

prompts = [
    {"prompt": "How to effectively type a function component with TypeScript in React?",
        "tag": "#React #TypeScript #FunctionalComponents"},
    {"prompt": "How to create dynamic routing in Next.js based on fetched data?",
        "tag": "#NextJS #DynamicRouting"},
    {"prompt": "What is the most efficient way to manage global state in a Next.js app?",
        "tag": "#NextJS #StateManagement"},
    {"prompt": "How to integrate a CSS-in-JS library like styled-components in Next.js?",
        "tag": "#NextJS #styled-components #CSSinJS"},
    {"prompt": "What are some effective patterns for sharing code between the server and client in a Next.js app?",
        "tag": "#NextJS #CodeSharing"},
    {"prompt": "How to create an isomorphic unfetch in Next.js for making API requests?",
        "tag": "#NextJS #API #unfetch"},
    {"prompt": "How to use React Query in a React app for better state synchronization across multiple React components?",
        "tag": "#React #ReactQuery"},
    {"prompt": "How to configure Django settings for different environments (development, production, testing, etc.)?",
     "tag": "#Django #EnvironmentSettings"},
    {"prompt": "How to use Django signals for decoupling applications?",
        "tag": "#Django #Signals"},
    {"prompt": "What's the best practice to deal with complex database migrations in Django?",
        "tag": "#Django #DatabaseMigrations"},
    {"prompt": "How to create a custom middleware in Django to process requests and responses?",
        "tag": "#Django #Middleware"},
    {"prompt": "How to debug a Django application in a Docker container?",
        "tag": "#Django #Docker #Debugging"},
    {"prompt": "What are the best ways to ensure a Python script is idempotent?",
        "tag": "#Python #Idempotent"},
    {"prompt": "How to optimize bash scripts for large file processing?",
        "tag": "#Bash #ScriptOptimization"},
    {"prompt": "How to configure automatic code formatting for a TypeScript project?",
        "tag": "#TypeScript #CodeFormatting"},
    {"prompt": "How to use React's Profiler API to measure performance?",
        "tag": "#React #ProfilerAPI #Performance"},
    {"prompt": "What's the best approach to handle form validation in a React application?",
        "tag": "#React #FormValidation"},
    {"prompt": "How to efficiently prefetch data in Next.js?",
        "tag": "#NextJS #DataPrefetching"},
    {"prompt": "How to implement a custom document in Next.js for server-side rendering?",
        "tag": "#NextJS #SSR #CustomDocument"},
    {"prompt": "How to use Next.js API routes for building a serverless API?",
        "tag": "#NextJS #APIRoutes"},
    {"prompt": "What are the best practices for error handling in Next.js?",
        "tag": "#NextJS #ErrorHandling"},
    {"prompt": "How to implement static site generation with Next.js?",
        "tag": "#NextJS #StaticSiteGeneration"},
    {"prompt": "How to create dynamic imports in Next.js to optimize page loads?",
        "tag": "#NextJS #DynamicImports"},
    {"prompt": "How to create global styles with styled-components in a Next.js app?",
        "tag": "#NextJS #styled-components #GlobalStyles"},
    {"prompt": "How to improve performance of Django applications by optimizing database queries?",
        "tag": "#Django #Performance #DatabaseQueries"},
    {"prompt": "How to use Django's testing tools for writing unit tests?",
        "tag": "#Django #Testing"},
    {"prompt": "How to implement user authentication in Django using Django's authentication system?",
        "tag": "#Django #Authentication"},
    {"prompt": "How to use Django REST Framework for building a RESTful API?",
        "tag": "#Django #RESTFramework"},
    {"prompt": "How to implement a custom user model in Django?",
        "tag": "#Django #CustomUserModel"},
    {"prompt": "How to implement CORS in Django REST Framework?",
        "tag": "#Django #RESTFramework #CORS"},
    {"prompt": "What are the best practices for managing settings and configuration in Python applications?",
        "tag": "#Python #Settings"},
    {"prompt": "How to improve performance of Python applications using multi-threading?",
        "tag": "#Python #Performance #MultiThreading"},
    {"prompt": "What are the best practices for exception handling in Python?",
        "tag": "#Python #ExceptionHandling"},
    {"prompt": "How to write efficient bash scripts for automating repetitive tasks?",
        "tag": "#Bash #ScriptAutomation"},
    {"prompt": "How to implement a search feature in Django?", "tag": "#Django #Search"},
    {"prompt": "How to use Python's asyncio library for asynchronous programming?",
        "tag": "#Python #Asyncio"},
    {"prompt": "How to implement an infinite scroll feature in a React application?",
        "tag": "#React #InfiniteScroll"},
    {"prompt": "How to use TypeScript with React Native?",
        "tag": "#TypeScript #ReactNative"},
    {"prompt": "What are some advanced use cases for Django's signals?",
        "tag": "#Django #Signals"},
    {"prompt": "What are the best practices for securing a Next.js application?",
        "tag": "#NextJS #Security"},
    {"prompt": "How to use service workers with a React application?",
        "tag": "#React #ServiceWorkers"},
    {"prompt": "How to optimize rendering in a large-scale React application?",
        "tag": "#React #Performance"},
    {"prompt": "How to handle data fetching errors in Next.js?",
        "tag": "#NextJS #DataFetching"},
    {"prompt": "What are some efficient ways to debug issues in a large Next.js application?",
        "tag": "#NextJS #Debugging"},
    {"prompt": "How to secure API routes in Next.js?", "tag": "#NextJS #APIRoutes"},
    {"prompt": "What are some use cases for Next.js middleware?",
        "tag": "#NextJS #Middleware"},
    {"prompt": "What are some tips for optimizing the performance of a Django application?",
        "tag": "#Django #Performance"},
    {"prompt": "What are the steps to deploy a Django application to a production environment?",
        "tag": "#Django #Deployment"},
    {"prompt": "What are some advanced use cases for Django model managers?",
        "tag": "#Django #ModelManagers"},
    {"prompt": "How to implement custom middleware in Django for handling exceptions?",
        "tag": "#Django #Middleware #ExceptionHandling"},
    {"prompt": "What are the best practices for managing dependencies in a Python project?",
        "tag": "#Python #DependencyManagement"},
    {"prompt": "What are some advanced use cases for Python decorators?",
        "tag": "#Python #Decorators"},
    {"prompt": "What are some techniques for optimizing the performance of Python scripts?",
        "tag": "#Python #Performance"},
    {"prompt": "What are the best practices for writing unit tests in Python?",
        "tag": "#Python #UnitTest"},
    {"prompt": "How to use Python's logging module in a large-scale application?",
        "tag": "#Python #Logging"},
    {"prompt": "What are some advanced use cases for bash scripting?",
        "tag": "#Bash #Scripting"},
    {"prompt": "How to handle errors in bash scripts effectively?",
        "tag": "#Bash #ErrorHandling"},
    {"prompt": "What are some useful bash commands for managing file permissions?",
        "tag": "#Bash #FilePermissions"},
    {"prompt": "How to use environment variables in bash scripts?",
        "tag": "#Bash #EnvironmentVariables"},
    {"prompt": "How to configure automatic code formatting for a TypeScript project?",
        "tag": "#TypeScript #CodeFormatting"},
    {"prompt": "How to use React's Profiler API to measure performance?",
        "tag": "#React #ProfilerAPI #Performance"},
    {"prompt": "What's the best approach to handle form validation in a React application?",
        "tag": "#React #FormValidation"},
    {"prompt": "How to efficiently prefetch data in Next.js?",
        "tag": "#NextJS #DataPrefetching"},
    {"prompt": "How to implement a custom document in Next.js for server-side rendering?",
        "tag": "#NextJS #SSR #CustomDocument"},
    {"prompt": "How to use Next.js API routes for building a serverless API?",
        "tag": "#NextJS #APIRoutes"},
    {"prompt": "What are the best practices for error handling in Next.js?",
        "tag": "#NextJS #ErrorHandling"},
    {"prompt": "How to implement static site generation with Next.js?",
        "tag": "#NextJS #StaticSiteGeneration"},
    {"prompt": "How to create dynamic imports in Next.js to optimize page loads?",
        "tag": "#NextJS #DynamicImports"},
    {"prompt": "How to create global styles with styled-components in a Next.js app?",
        "tag": "#NextJS #styled-components #GlobalStyles"},
    {"prompt": "How to improve performance of Django applications by optimizing database queries?",
        "tag": "#Django #Performance #DatabaseQueries"},
    {"prompt": "How to use Django's testing tools for writing unit tests?",
        "tag": "#Django #Testing"},
    {"prompt": "How to implement user authentication in Django using Django's authentication system?",
        "tag": "#Django #Authentication"},
    {"prompt": "How to use Django REST Framework for building a RESTful API?",
        "tag": "#Django #RESTFramework"},
    {"prompt": "How to implement a custom user model in Django?",
        "tag": "#Django #CustomUserModel"},
    {"prompt": "How to implement CORS in Django REST Framework?",
        "tag": "#Django #RESTFramework #CORS"},
    {"prompt": "What are the best practices for managing settings and configuration in Python applications?",
        "tag": "#Python #Settings"},
    {"prompt": "How to improve performance of Python applications using multi-threading?",
        "tag": "#Python #Performance #MultiThreading"},
    {"prompt": "What are the best practices for exception handling in Python?",
        "tag": "#Python #ExceptionHandling"},
    {"prompt": "How to write efficient bash scripts for automating repetitive tasks?",
        "tag": "#Bash #ScriptAutomation"},
    {"prompt": "How to implement a search feature in Django?", "tag": "#Django #Search"},
    {"prompt": "How to use Python's asyncio library for asynchronous programming?",
        "tag": "#Python #Asyncio"},
    {"prompt": "How to implement an infinite scroll feature in a React application?",
        "tag": "#React #InfiniteScroll"},
    {"prompt": "How to use TypeScript with React Native?",
        "tag": "#TypeScript #ReactNative"},
    {"prompt": "What are some advanced use cases for Django's signals?",
        "tag": "#Django #Signals"},
    {"prompt": "What are the best practices for securing a Next.js application?",
        "tag": "#NextJS #Security"},
    {"prompt": "How to use service workers with a React application?",
        "tag": "#React #ServiceWorkers"},
    {"prompt": "How to optimize rendering in a large-scale React application?",
        "tag": "#React #Performance"},
    {"prompt": "How to handle data fetching errors in Next.js?",
        "tag": "#NextJS #DataFetching"},
    {"prompt": "What are some efficient ways to debug issues in a large Next.js application?",
        "tag": "#NextJS #Debugging"},
    {"prompt": "How to secure API routes in Next.js?", "tag": "#NextJS #APIRoutes"},
    {"prompt": "What are some use cases for Next.js middleware?",
        "tag": "#NextJS #Middleware"},
    {"prompt": "What are some tips for optimizing the performance of a Django application?",
        "tag": "#Django #Performance"},
    {"prompt": "What are the steps to deploy a Django application to a production environment?",
        "tag": "#Django #Deployment"},
    {"prompt": "What are some advanced use cases for Django model managers?",
        "tag": "#Django #ModelManagers"},
    {"prompt": "How to implement custom middleware in Django for handling exceptions?",
        "tag": "#Django #Middleware #ExceptionHandling"},
    {"prompt": "What are the best practices for managing dependencies in a Python project?",
        "tag": "#Python #DependencyManagement"},
    {"prompt": "What are some advanced use cases for Python decorators?",
        "tag": "#Python #Decorators"},
    {"prompt": "What are some techniques for optimizing the performance of Python scripts?",
        "tag": "#Python #Performance"},
    {"prompt": "What are the best practices for writing unit tests in Python?",
        "tag": "#Python #UnitTest"},
    {"prompt": "How to use Python's logging module in a large-scale application?",
        "tag": "#Python #Logging"},
    {"prompt": "What are some advanced use cases for bash scripting?",
        "tag": "#Bash #Scripting"},
    {"prompt": "How to handle errors in bash scripts effectively?",
        "tag": "#Bash #ErrorHandling"},
    {"prompt": "What are some useful bash commands for managing file permissions?",
        "tag": "#Bash #FilePermissions"},
    {"prompt": "How to use environment variables in bash scripts?",
        "tag": "#Bash #EnvironmentVariables"},
    {"prompt": "How to effectively use TypeScript generics with React?",
        "tag": "#React #TypeScript #Generics"},
    {"prompt": "How to use Next.js with GraphQL?", "tag": "#NextJS #GraphQL"},
    {"prompt": "Best practices for integrating third-party libraries in a Next.js app?",
        "tag": "#NextJS #ThirdPartyLibraries"},
    {"prompt": "How to set up and use CSS Modules in Next.js?",
        "tag": "#NextJS #CSSModules"},
    {"prompt": "What are some effective strategies for testing Next.js apps?",
        "tag": "#NextJS #Testing"},
    {"prompt":
        "How to efficiently implement Server-Side Rendering (SSR) in Next.js?", "tag": "#NextJS #SSR"},
    {"prompt": "How to handle SEO in a React application?", "tag": "#React #SEO"},
    {"prompt": "How to set up i18n (Internationalization) in a React application?",
     "tag": "#React #i18n"},
    {"prompt": "What's the best way to handle side effects in React with hooks?",
        "tag": "#React #Hooks #SideEffects"},
    {"prompt": "How to implement end-to-end testing in a Django application?",
        "tag": "#Django #EndToEndTesting"},
    {"prompt": "How to use Django's class-based views effectively?",
        "tag": "#Django #ClassBasedViews"},
    {"prompt": "How to use WebSocket in Django for real-time communication?",
        "tag": "#Django #WebSocket"},
    {"prompt": "How to implement a many-to-many field in Django models?",
        "tag": "#Django #ManyToMany"},
    {"prompt": "Best practices for securing a Django web application?",
        "tag": "#Django #Security"},
    {"prompt": "How to effectively use Python's asyncio for concurrent programming?",
        "tag": "#Python #Asyncio"},
    {"prompt": "How to write effective and clean list comprehensions in Python?",
        "tag": "#Python #ListComprehensions"},
    {"prompt": "Best practices for error handling in Python?",
        "tag": "#Python #ErrorHandling"},
    {"prompt": "How to write efficient bash scripts for task automation?",
        "tag": "#Bash #TaskAutomation"},
    {"prompt": "How to create and manage symbolic links in bash?",
        "tag": "#Bash #SymbolicLinks"},
    {"prompt": "How to handle command-line arguments in bash scripts?",
        "tag": "#Bash #CommandLineArguments"},
    {"prompt": "Best practices for making a bash script interactive?",
        "tag": "#Bash #InteractiveScripts"},
    {"prompt": "How to set up linting and formatting for a TypeScript project?",
        "tag": "#TypeScript #Linting #Formatting"},
    {"prompt": "How to set up and use Jest for testing a TypeScript project?",
        "tag": "#TypeScript #Testing #Jest"},
    {"prompt": "What's the best way to use enums in TypeScript?",
        "tag": "#TypeScript #Enums"},
    {"prompt": "How to handle module resolution and aliases in a TypeScript project?",
        "tag": "#TypeScript #ModuleResolution #Aliases"},
    {"prompt": "How to effectively type React's context API with TypeScript?",
        "tag": "#React #TypeScript #ContextAPI"},
    {"prompt": "What's the best way to handle global state in a large React application?",
        "tag": "#React #GlobalState"},
    {"prompt": "How to implement dark mode in a React application?",
        "tag": "#React #DarkMode"},
    {"prompt": "What are the best practices for handling async operations in React with hooks?",
        "tag": "#React #Hooks #AsyncOperations"},
    {"prompt": "How to set up environment-specific configurations in a Next.js app?",
        "tag": "#NextJS #EnvironmentConfiguration"},
]


fake = Faker()

# Create a new client for MongoDB
client = MongoClient(
    'mongodb+srv://daviewave:123@prompt-pioneer.drydbbr.mongodb.net/?retryWrites=true&w=majority')

# Get your database
db = client['prompt-pioneer']

# Get the users collection
users_col = db['users']

# Get the prompts collection
prompts_col = db['prompts']

# Retrieve all users
users = list(users_col.find({}))

# Generate 100 prompts
i = 1
for prompt in prompts:
    # Pick a random user
    user = random.choice(users)

    # Create a new prompt
    prompt = {
        "prompt": prompt['prompt'],
        "tag": prompt['tag'],
        "creator": user['_id'],
        "__v": i
    }

    # increase index
    i += 1

    # Insert the prompt into the database
    try:
        print("Inserting prompt: ", prompt)
        prompts_col.insert_one(prompt)
    except Exception as e:
        print("An error occurred while inserting a prompt.")
        print("Error: ", e)
        break

print("Successfully inserted 100 random prompts.")
