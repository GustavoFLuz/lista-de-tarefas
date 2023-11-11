pipeline {
    agent any


    stages {
        stage('Install Dependencie') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
                archiveArtifacts 'html/'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }
        
    }
}
