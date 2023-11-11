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
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }
        
    }

    post {
        always {
            testResults: 'html/**'
        }
}
