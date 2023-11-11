pipeline {
    agent {docker true}

    

    stages {
        stage('Check Dependencies') {
            steps {
                sh '
                node --version
                npm --version
                npm install'
            }
        }
    }
}
