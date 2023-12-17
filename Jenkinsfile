pipeline {
    agent any

    stages {
        stage('Clone code from GitHub') {
          steps {
            git branch: 'main', url: 'https://github.com/longmvd/e-commerce-fe.git'
          }
        }
        stage('Build and Push to DockerHub') {
            steps {
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t giadienanhkysi/ecommerce-frontend .'
                    sh 'docker push giadienanhkysi/ecommerce-frontend'
                }
            }
        }
        stage('Deploy to remote server') {
            steps {
                script {
                    sshagent(credentials: ['ecommerce-server']) {
                        // Remote server details
                        def remoteServer = '14.225.204.198'
                        def remoteUser = 'root'
                        def remoteDir = '/ecommerce-production'

                        // SSH to the remote server and execute commands
                        sshCommand remote: remoteServer,
                                   user: remoteUser,
                                   command: """
                                             cd ${remoteDir} &&
                                             docker pull giadienanhkysi/ecommerce-frontend &&
                                             docker-compose up -d
                                             """
                    }
                }
            }
        }
    }
}