pipeline {
    agent any


    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
                archiveArtifacts testReport: 'html/'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }
        
    }
}
