void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: env.GIT_URL],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "Jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
  agent any

  environment {
    GOOGLE_API_KEY= credentials('jenkins-google-recaptcha-api-key')
  }

  stages {
    stage('Build') {
      steps {
        echo 'Building...'
        setBuildStatus('Starting build', 'PENDING')
        sh 'yarn'
        sh 'yarn build'
      }
    }
    stage('Lint') {
      steps {
        echo 'Linting...'
        sh 'yarn validate'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing...'
        sh 'yarn test'
      }
    }
    stage('Coverage') {
      steps {
        echo 'Getting coverage...'
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        echo 'Deploying...'
//         build job: '', propagate: true, wait: true
      }
    }
  }
  post {
    success {
      setBuildStatus('Build succeeded', 'SUCCESS');
      sh 'make clean'
      sh 'rm -rf dist node_modules coverage'
    }
    failure {
      setBuildStatus('Build failed', 'FAILURE');
      sh 'make clean'
      sh 'rm -rf dist node_modules coverage'
    }
  }
}
