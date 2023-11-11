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
                sh 'npx vite preview --outDir html'
                archiveArtifacts 'html/'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
                archiveArtifacts 'dist/'
            }
        }
        
    }
}
