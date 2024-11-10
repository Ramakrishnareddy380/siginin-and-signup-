pipeline {
  agent any
  tools { nodejs "NodeJS" }
  stages {
    stage('Checkout SCM') {
      steps {
        git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
      
      }
    }
  }
}
