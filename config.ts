import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 4000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    post: {
      name: "PostController",
      path: "../controllers/postController"
    },
    comentario: {
      name: "ComentarioController",
      path: "../controllers/comentarioController"
    },
    reacao: {
      name: "ReacaoController",
      path: "../controllers/reacaoController"
    },
    test: {
      name: "TestController",
      path: "../controllers/testController"
    }
  },

  repos: {
    post: {
      name: "PostRepo",
      path: "../repos/postRepo"
    },
    comentario: {
      name: "ComentarioRepo",
      path: "../repos/comentarioRepo"
    },
    reacao: {
      name: "ReacaoRepo",
      path: "../repos/reacaoRepo"
    },
  },

  services: {
    post: {
      name: "PostService",
      path: "../services/postService"
    },
    comentario: {
      name: "ComentarioService",
      path:"../services/comentarioService"
    },
    reacao: {
      name: "ReacaoService",
      path: "../services/reacaoService"
    }
  },
};
